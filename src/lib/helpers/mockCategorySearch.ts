import { Option } from "@/components/ui/multipleSelector";
import { categoriesOption } from "../constant/options";

const mockCategorySearch = async (value: string): Promise<Option[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const res = categoriesOption.filter((option) => option.value.includes(value));
        resolve(res);
      }, 1000);
    });
  };

  export default mockCategorySearch