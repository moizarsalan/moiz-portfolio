"use client";

import {
  FormEvent,
  KeyboardEvent,
  useState,
} from "react";

import {
  ArrowUp,
  Paperclip,
} from "lucide-react";

type MessageComposerProps = {
  onSend: (message: string) => void;
  compact?: boolean;
};

export default function MessageComposer({
  onSend,
  compact = false,
}: MessageComposerProps) {
  const [message, setMessage] = useState("");

  function submitMessage() {
    const value = message.trim();

    if (!value) return;

    onSend(value);
    setMessage("");
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    submitMessage();
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      submitMessage();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex
        items-end
        gap-2
        border-t
        border-border
        bg-background/80
        p-3
        backdrop-blur-xl
      "
    >
      <button
        type="button"
        aria-label="Attach file"
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-border
          bg-surface/50
          text-muted
          transition-all
          hover:border-primary/30
          hover:text-primary
        "
      >
        <Paperclip size={16} />
      </button>

      <div
        className="
          flex
          min-h-10
          flex-1
          items-end
          rounded-xl
          border
          border-border
          bg-surface/45
          transition-all
          focus-within:border-primary/40
          focus-within:shadow-[0_0_18px_var(--primary-glow)]
        "
      >
        <textarea
          value={message}
          onChange={(event) =>
            setMessage(
              event.target.value
            )
          }
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Write a message..."
          className={`
            max-h-28
            min-h-10
            w-full
            resize-none
            bg-transparent
            px-3
            py-2.5
            text-sm
            leading-5
            text-foreground
            outline-none
            placeholder:text-muted/60

            ${
              compact
                ? "text-xs"
                : ""
            }
          `}
        />
      </div>

      <button
        type="submit"
        disabled={!message.trim()}
        aria-label="Send message"
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          [background:linear-gradient(135deg,var(--primary),var(--secondary))]
          text-white
          shadow-[0_0_18px_var(--primary-glow)]
          transition-all
          duration-300
          hover:-translate-y-0.5
          disabled:cursor-not-allowed
          disabled:opacity-35
        "
      >
        <ArrowUp size={16} />
      </button>
    </form>
  );
}