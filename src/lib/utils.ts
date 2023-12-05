import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDayName = (index: number) => {
  let name = ""
  switch (index){
    case 0: {
      name = "MON";
      break;
    }
    case 1: {
      name = "TUE";
      break;
    }
    case 2: {
      name = "WED";
      break;
    }
    case 3: {
      name = "THU";
      break;
    }
    case 4: {
      name = "FRI";
      break;
    }
    case 5: {
      name = "SAT";
      break;
    }
    case 6: {
      name = "SUN";
      break;
    }
  }

  return name
}
