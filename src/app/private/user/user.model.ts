export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job: string;
}

export class UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  ad: [];
}
