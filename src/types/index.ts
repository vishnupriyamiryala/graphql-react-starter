export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}

export interface Album {
  id: string;
  title: string;
  user?: User | { id: string };
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationLink {
  page: number;
  limit: number;
}

export interface PaginationLinks {
  first: PaginationLink | null;
  prev: PaginationLink | null;
  next: PaginationLink | null;
  last: PaginationLink | null;
}

export interface UsersData {
  users: {
    data: User[];
    meta: {
      totalCount: number;
    };
  };
}

export interface UserData {
  user: User;
}

export interface PostsData {
  user: {
    posts: {
      data: Post[];
      links: PaginationLinks;
      meta: {
        totalCount: number;
      };
    };
  };
}

export interface AllPostsData {
  posts: {
    data: Post[];
    links: PaginationLinks;
    meta: {
      totalCount: number;
    };
  };
}

export interface AlbumsData {
  user: {
    albums: {
      data: Album[];
    };
  };
}

export interface CreateAlbumData {
  createAlbum: Album;
}

export interface UpdateAlbumData {
  updateAlbum: Album;
}
