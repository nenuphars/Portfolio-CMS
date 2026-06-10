"use client";

import CreatableSelect from "react-select/creatable";

type Option = { label: string; value: string };

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
  existingTags?: string[];
};

export function TagsSelect({ value, onChange, existingTags = [] }: Props) {
  // convert string arrays to the {label, value} shape react-select expects
  const options: Option[] = existingTags.map((tag) => ({ label: tag, value: tag }));
  const selected: Option[] = value.map((tag) => ({ label: tag, value: tag }));

  return (
    <CreatableSelect
      isMulti
      options={options}
      value={selected}
      onChange={(selected) => onChange(selected.map((opt) => opt.value))}
      placeholder="Add tags..."
      formatCreateLabel={(input) => `Create tag "${input}"`}
    />
  );
}
