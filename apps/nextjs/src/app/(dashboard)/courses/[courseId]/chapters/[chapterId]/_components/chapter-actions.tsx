"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { ConfirmModal } from "~/components/modals/confirm-modal";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
};

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished
}: ChapterActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const context = api.useContext()

  const pub = api.admin.chapter.publish.useMutation({
    onSuccess() {
      toast.success("Chapter published");
      setIsLoading(false)
    },
    onError(error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  })

  const unPub = api.admin.chapter.unpublish.useMutation({
    onSuccess() {
      toast.success("Chapter unpublished");
      setIsLoading(false)
    },
    onError(error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  })

  const deleteChapter = api.admin.chapter.delete.useMutation({
    async onSuccess() {
      toast.success("Chapter deleted");
      await context.admin.chapter.invalidate()
      setIsLoading(false);
    },
    onError(error) {
      toast.error(error.message)
      setIsLoading(false);
    }
  })

  const onClick = async () => {
    setIsLoading(true);

    if (isPublished) {
      pub.mutate({
        id: chapterId,
        courseId: courseId
      })
    } else {
      unPub.mutate({
        id: chapterId,
        courseId: courseId
      })
    }

    await context.admin.chapter.invalidate()
  }

  const onDelete = () => {
    setIsLoading(true);

    deleteChapter.mutate({
      id: chapterId,
      courseId: courseId
    })
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}