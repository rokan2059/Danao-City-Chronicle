export interface BlogPostState {
  content: string;
  isLoading: boolean;
  error: string | null;
}

export interface NavItem {
  label: string;
  href: string;
}
