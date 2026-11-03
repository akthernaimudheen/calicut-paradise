import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <span className="eyebrow">404</span>
      <h1 className="display-lg mt-4">That page is off the menu.</h1>
      <p className="lede mt-4 max-w-md text-[14px]">
        The link you followed does not exist. The menu, however, does.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/menu" className="btn btn-primary">
          Browse the menu
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back home
        </Link>
      </div>
    </div>
  );
}
