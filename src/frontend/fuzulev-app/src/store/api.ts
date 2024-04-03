import { emptySplitApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    getApiV1Main: build.query<GetApiV1MainApiResponse, GetApiV1MainApiArg>({
      query: () => ({ url: `/api/v1/Main` }),
    }),
    getApiV1MainPublic: build.query<
      GetApiV1MainPublicApiResponse,
      GetApiV1MainPublicApiArg
    >({
      query: () => ({ url: `/api/v1/Main/public` }),
    }),
    getApiV1PlaylistsQuery: build.query<
      GetApiV1PlaylistsQueryApiResponse,
      GetApiV1PlaylistsQueryApiArg
    >({
      query: () => ({ url: `/api/v1/Playlists/Query` }),
    }),
    getApiV1PlaylistsById: build.query<
      GetApiV1PlaylistsByIdApiResponse,
      GetApiV1PlaylistsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/Playlists/${queryArg.id}` }),
    }),
    getApiV1PlaylistsGetPublicByIdById: build.query<
      GetApiV1PlaylistsGetPublicByIdByIdApiResponse,
      GetApiV1PlaylistsGetPublicByIdByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/Playlists/GetPublicById/${queryArg.id}`,
      }),
    }),
    postApiV1PlaylistsCreate: build.mutation<
      PostApiV1PlaylistsCreateApiResponse,
      PostApiV1PlaylistsCreateApiArg
    >({
      query: () => ({ url: `/api/v1/Playlists/Create`, method: "POST" }),
    }),
    getApiV1PlaylistsFeatured: build.query<
      GetApiV1PlaylistsFeaturedApiResponse,
      GetApiV1PlaylistsFeaturedApiArg
    >({
      query: () => ({ url: `/api/v1/Playlists/Featured` }),
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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
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
export type GetApiV1MainApiResponse = /** status 200 Success */ SomeExampleData;
export type GetApiV1MainApiArg = void;
export type GetApiV1MainPublicApiResponse =
  /** status 200 Success */ SomeExampleData;
export type GetApiV1MainPublicApiArg = void;
export type GetApiV1PlaylistsQueryApiResponse = unknown;
export type GetApiV1PlaylistsQueryApiArg = void;
export type GetApiV1PlaylistsByIdApiResponse =
  /** status 200 Success */ PlaylistDto;
export type GetApiV1PlaylistsByIdApiArg = {
  id: number;
};
export type GetApiV1PlaylistsGetPublicByIdByIdApiResponse =
  /** status 200 Success */ PublicPlaylistDto;
export type GetApiV1PlaylistsGetPublicByIdByIdApiArg = {
  id: number;
};
export type PostApiV1PlaylistsCreateApiResponse = unknown;
export type PostApiV1PlaylistsCreateApiArg = void;
export type GetApiV1PlaylistsFeaturedApiResponse =
  /** status 200 Success */ FeaturedPlaylistDto[];
export type GetApiV1PlaylistsFeaturedApiArg = void;
export type GetApiV1UsersQueryApiResponse = unknown;
export type GetApiV1UsersQueryApiArg = void;
export type PostApiV1UsersUpdateApiResponse = unknown;
export type PostApiV1UsersUpdateApiArg = void;
export type PostApiV1UsersUpdateTimestampApiResponse = unknown;
export type PostApiV1UsersUpdateTimestampApiArg = void;
export type SeedServiceType =
  | "Accounts"
  | "Playlists"
  | "FeaturedPlaylists"
  | "Videos";
export type SomeExampleData = {
  id?: number;
  name?: string;
};
export type VideoDto = {
  id?: number;
  title?: string;
  description?: string;
  metaDataUrl?: string;
  durationInSeconds?: number;
};
export type PlaylistSectionDto = {
  id?: number;
  title?: string;
  videos?: VideoDto[];
  durationInSeconds?: number;
};
export type PlaylistDto = {
  id?: number;
  title?: string;
  sections?: PlaylistSectionDto[];
};
export type PublicVideoDto = {
  id?: number;
  title?: string;
  description?: string;
  metaDataUrl?: string;
  isPreview?: boolean;
  durationInSeconds?: number;
};
export type PublicPlaylistSectionDto = {
  id?: number;
  title?: string;
  videos?: PublicVideoDto[];
  durationInSeconds?: number;
};
export type PublicPlaylistDto = {
  id?: number;
  title?: string;
  sections?: PublicPlaylistSectionDto[];
};
export type FeaturedPlaylistDto = {
  id?: number;
  title?: string;
  thumbnailImageUrl?: string;
  contentProducer?: string;
  sectionCount?: number;
  videoCount?: number;
  durationInSeconds?: number;
};
export const {
  usePostDevV1DevelopmentSeedMutation,
  usePostDevV1DevelopmentMigrateAsyncMutation,
  useGetApiV1MainQuery,
  useGetApiV1MainPublicQuery,
  useGetApiV1PlaylistsQueryQuery,
  useGetApiV1PlaylistsByIdQuery,
  useGetApiV1PlaylistsGetPublicByIdByIdQuery,
  usePostApiV1PlaylistsCreateMutation,
  useGetApiV1PlaylistsFeaturedQuery,
  useGetApiV1UsersQueryQuery,
  usePostApiV1UsersUpdateMutation,
  usePostApiV1UsersUpdateTimestampMutation,
} = injectedRtkApi;
