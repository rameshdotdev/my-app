import { useSoundFile } from "@/hooks/use-sound-file";
import { SOUND_FILES } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

function SwitchProfile({
  activeIndex,
  onClick,
}: {
  activeIndex: 0 | 1;
  onClick: () => void;
}) {
  const { play } = useSoundFile({
    volume: 0.7,
    enabled: true,
    sounds: SOUND_FILES,
  });
  return (
    <button
      onClick={() => {
        onClick();
        play("glitch");
      }}
      className="cursor-pointer mt-0 md:mt-2 h-4 w-4"
      aria-label="Switch character"
      title="Switch character"
      data-ignore-button="true"
    >
      {activeIndex === 0 ? (
        <RotateCcw className="size-3 rotate-120 text-muted-foreground transition-all duration-300 group-hover:text-foreground" />
      ) : (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-muted-foreground transition-all duration-300 group-hover:text-foreground"
          height="12"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path>
        </svg>
      )}
    </button>
  );
}

export default SwitchProfile;
