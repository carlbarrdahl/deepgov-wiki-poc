import type { ComponentPropsWithRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const BackgroundImage = ({
  src,
  fallbackSrc = "data:image/png;base64,",
  isLoading,
  className,
  ...props
}: {
  src?: string;
  fallbackSrc?: string;
  isLoading?: boolean;
} & ComponentPropsWithRef<"div">) => (
  <div
    {...props}
    className={cn(className, "relative overflow-hidden rounded-lg", {
      ["animate-pulse bg-gray-100"]: isLoading,
    })}
  >
    <Image
      src={src ?? fallbackSrc ?? ""}
      alt=""
      fill
      placeholder="data:image/"
      className={cn("object-cover", {
        ["blur-[40px]"]: fallbackSrc && !src,
      })}
    />
  </div>
);
