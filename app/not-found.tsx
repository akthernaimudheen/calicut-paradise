import { CTA } from "@/components/ui/cta";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <span className="eyebrow">404</span>
      <h1 className="display-lg mt-4">That page is off the menu.</h1>
      <p className="lede mt-4 max-w-md text-[14px]">
        The link you followed does not exist. The menu, however, does.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <CTA href="/menu" variant="primary" arrow>
          Browse the menu
        </CTA>
        <CTA href="/" variant="secondary">
          Back home
        </CTA>
      </div>
    </div>
  );
}
