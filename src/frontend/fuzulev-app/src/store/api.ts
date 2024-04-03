import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiV1AddressCities: build.query<
      GetApiV1AddressCitiesApiResponse,
      GetApiV1AddressCitiesApiArg
    >({
      query: () => ({ url: `/api/v1/Address/Cities` }),
    }),
    getApiV1AddressGetDistricts: build.query<
      GetApiV1AddressGetDistrictsApiResponse,
      GetApiV1AddressGetDistrictsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/Address/GetDistricts`,
        params: { cityIds: queryArg.cityIds },
      }),
    }),
    postDevV1DevelopmentSeed: build.mutation<
      PostDevV1DevelopmentSeedApiResponse,
      PostDevV1DevelopmentSeedApiArg
    >({
      query: (queryArg) => ({
        url: `/dev/v1/Development/Seed`,
        method: "POST",
        headers: { "X-ApiKey": queryArg["X-ApiKey"] },
        params: { seeds: queryArg.seeds, recreateDb: queryArg.recreateDb },
      }),
    }),
    postDevV1DevelopmentMigrateAsync: build.mutation<
      PostDevV1DevelopmentMigrateAsyncApiResponse,
      PostDevV1DevelopmentMigrateAsyncApiArg
    >({
      query: (queryArg) => ({
        url: `/dev/v1/Development/MigrateAsync`,
        method: "POST",
        headers: { "X-ApiKey": queryArg["X-ApiKey"] },
      }),
    }),
    getApiV1RealEstateQuery: build.query<
      GetApiV1RealEstateQueryApiResponse,
      GetApiV1RealEstateQueryApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/RealEstate/Query`,
        params: {
          Offset: queryArg.offset,
          Count: queryArg.count,
          MinPriceInclusive: queryArg.minPriceInclusive,
          MaxPriceInclusive: queryArg.maxPriceInclusive,
          Types: queryArg.types,
          Cities: queryArg.cities,
          Districts: queryArg.districts,
        },
      }),
    }),
    getApiV1UsersQuery: build.query<
      GetApiV1UsersQueryApiResponse,
      GetApiV1UsersQueryApiArg
    >({
      query: () => ({ url: `/api/v1/Users/Query` }),
    }),
    postApiV1UsersUpdate: build.mutation<
      PostApiV1UsersUpdateApiResponse,
      PostApiV1UsersUpdateApiArg
    >({
      query: () => ({ url: `/api/v1/Users/Update`, method: "POST" }),
    }),
    postApiV1UsersUpdateTimestamp: build.mutation<
      PostApiV1UsersUpdateTimestampApiResponse,
      PostApiV1UsersUpdateTimestampApiArg
    >({
      query: () => ({ url: `/api/v1/Users/UpdateTimestamp`, method: "POST" }),
    }),
    postApiV1UsersVideoSavepoint: build.mutation<
      PostApiV1UsersVideoSavepointApiResponse,
      PostApiV1UsersVideoSavepointApiArg
    >({
      query: () => ({ url: `/api/v1/Users/VideoSavepoint`, method: "POST" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type GetApiV1AddressCitiesApiResponse =
  /** status 200 Success */ CityRead[];
export type GetApiV1AddressCitiesApiArg = void;
export type GetApiV1AddressGetDistrictsApiResponse =
  /** status 200 Success */ DistrictRead[];
export type GetApiV1AddressGetDistrictsApiArg = {
  cityIds?: string;
};
export type PostDevV1DevelopmentSeedApiResponse = unknown;
export type PostDevV1DevelopmentSeedApiArg = {
  seeds?: SeedServiceType;
  recreateDb?: boolean;
  /** X-ApiKey */
  "X-ApiKey": string;
};
export type PostDevV1DevelopmentMigrateAsyncApiResponse = unknown;
export type PostDevV1DevelopmentMigrateAsyncApiArg = {
  /** X-ApiKey */
  "X-ApiKey": string;
};
export type GetApiV1RealEstateQueryApiResponse =
  /** status 200 Success */ RealEstateDtoPaginationDto;
export type GetApiV1RealEstateQueryApiArg = {
  offset?: number;
  count?: number;
  minPriceInclusive?: number;
  maxPriceInclusive?: number;
  types?: string;
  cities?: string;
  districts?: string;
};
export type GetApiV1UsersQueryApiResponse = unknown;
export type GetApiV1UsersQueryApiArg = void;
export type PostApiV1UsersUpdateApiResponse = unknown;
export type PostApiV1UsersUpdateApiArg = void;
export type PostApiV1UsersUpdateTimestampApiResponse = unknown;
export type PostApiV1UsersUpdateTimestampApiArg = void;
export type PostApiV1UsersVideoSavepointApiResponse = unknown;
export type PostApiV1UsersVideoSavepointApiArg = void;
export type City = {};
export type CityRead = {
  name?: string;
  code?: string;
};
export type District = {};
export type DistrictRead = {
  name?: string;
  code?: string;
  cityName?: string;
  cityCode?: string;
};
export type SeedServiceType = "Accounts" | "Locations" | "RealEstates";
export type RealEstateType =
  | "None"
  | "Residence"
  | "Apartment"
  | "Office"
  | "Warehouse"
  | "RetailShop";
export type RealEstateDto = {
  id?: number;
  price?: number;
  title?: string;
  type?: RealEstateType;
  locationId?: number;
  city?: string;
  district?: string;
  address?: string;
  createdAt?: string;
};
export type RealEstateDtoPaginationDto = {
  data?: RealEstateDto[];
  totalRowCount?: number;
};
export const {
  useGetApiV1AddressCitiesQuery,
  useGetApiV1AddressGetDistrictsQuery,
  usePostDevV1DevelopmentSeedMutation,
  usePostDevV1DevelopmentMigrateAsyncMutation,
  useGetApiV1RealEstateQueryQuery,
  useGetApiV1UsersQueryQuery,
  usePostApiV1UsersUpdateMutation,
  usePostApiV1UsersUpdateTimestampMutation,
  usePostApiV1UsersVideoSavepointMutation,
} = injectedRtkApi;
