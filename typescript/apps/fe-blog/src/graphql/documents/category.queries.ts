import { gql } from "graphql-request";
import { CATEGORY_FRAGMENT } from "~/graphql/documents/category.fragment";

export const GET_CATEGORIES = gql`
  query GetCategories(
    $filter: ListCategoriesFilter
    $pagination: PaginationInput
  ) {
    categories(filter: $filter, pagination: $pagination) {
      ...CategoryFragment
      parentCategory {
        ...CategoryFragment
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;
