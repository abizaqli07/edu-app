"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { ConfirmModal } from "~/components/modals/confirm-modal";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

export const Actions = ({
  disabled,
  courseId,
  isPublished
}: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const context = api.useContext()

  const pub = api.admin.course.publish.useMutation({
    onSuccess() {
      toast.success("Course published");
      setIsLoading(false)
    },
    onError(error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  })

  const unPub = api.admin.course.unpublish.useMutation({
    onSuccess() {
      toast.success("Course unpublished");
      setIsLoading(false)
    },
    onError(error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  })

  const deleteCourse = api.admin.course.delete.useMutation({
    async onSuccess() {
      toast.success("Course deleted");
      await context.admin.course.invalidate()
      setIsLoading(false);
      router.push("/course")
    },
    onError(error) {
      toast.error(error.message)
      setIsLoading(false);
    }
  })

  const onClick = async () => {
    setIsLoading(true);

    if (isPublished) {
      unPub.mutate({
        id: courseId
      })
    } else {
      pub.mutate({
        id: courseId
      })
    }

    await context.admin.chapter.invalidate()
  }

  const onDelete = () => {
    setIsLoading(true);

    deleteCourse.mutate({
      id: courseId
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