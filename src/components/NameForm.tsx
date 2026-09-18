import { useState, type FormEvent } from "react";

type Props = {
  placeholder: string;
  submitLabel: string;
  onSubmit: (name: string) => void;
};

/**
 * Submitting through a form, rather than listening for Enter, keeps Korean IME
 * composition from adding the last syllable a second time.
 */
export function NameForm({ placeholder, submitLabel, onSubmit }: Props) {
  const [name, setName] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setName("");
  }

  return (
    <form className="add-row" onSubmit={submit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={placeholder}
      />
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
