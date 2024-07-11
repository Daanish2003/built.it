import { tagsOption } from "../constant/options";

const mockTagSearch = async (value: string): Promise<TagsOptionType[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const res = tagsOption.filter((option) => option.value.includes(value));
        resolve(res);
      }, 1000);
    });
  };

  export default mockTagSearch