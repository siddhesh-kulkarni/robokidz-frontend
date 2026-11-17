
import { ArrowLeft, BookOpen } from "lucide-react";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({
  showBack = false,
  onBack,
}: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <BookOpen size={23} />
          </div>

          <div>
            <p className="text-md font-bold text-gray-500">
              AI Quiz Generator
            </p>
          </div>
        </div>

        {showBack ? (
          <button
            onClick={onBack}
            className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            <ArrowLeft size={17} />
            Back to Home
          </button>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
