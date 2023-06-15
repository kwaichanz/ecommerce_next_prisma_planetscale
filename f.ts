type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

function find<T>(criteria: T[]): T[] {
  return criteria;
}

type User = {
  id: number;
  name: string;
  address: {
    country: string;
    city: string;
    house: string;
    zipcode: string;
  };
};

type DeepPartialUser = {
  id?: number;
  name?: string;
  address?: {
    country?: string;
    city?: string;
    house?: string;
    zipcode?: string;
  };
};

// in this example im serching by country only even if address has other properties
const users:DeepPartialUser  = find({
  address: { country: "UK" },
});
