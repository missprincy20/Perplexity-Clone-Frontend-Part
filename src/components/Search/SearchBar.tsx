import SearchInput from "./SearchInput";
import FocusDropdown from "./FocusDropdown";
import SearchButton from "./SearchButton";
import AttachmentButton from "./AttachmentButton";
import MicButton from "./MicButton";

const SearchBar = () => {
  return (
    <div
      className="
      w-full
      max-w-5xl
      rounded-3xl
      border
      border-purple-500/40
      bg-[#111113]
      p-6
      shadow-[0_0_40px_rgba(99,102,241,0.25)]
      "
    >
      <SearchInput />

      <div className="mt-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <MicButton />

          <AttachmentButton />

        </div>

        <div className="flex items-center gap-4">

          <FocusDropdown />

          <SearchButton />

        </div>

      </div>

    </div>
  );
};

export default SearchBar;