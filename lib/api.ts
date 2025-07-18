const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

const PRODUCT_GRAPHQL_FIELDS = `
  slug
  title
  qpay
  date
  new
  price
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;
const COURSE_GRAPHQL_FIELDS = `
  slug
  title
  qpay
  date
  price
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    },
  ).then((response) => response.json());
}

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractProduct(fetchResponse: any): any {
  return fetchResponse?.data?.productCollection?.items?.[0];
}

function extractCourse(fetchResponse: any): any {
  return fetchResponse?.data?.courseCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items;
}

function extractProductEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.productCollection?.items;
}

function extractCourseEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.courseCollection?.items;
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  return extractPostEntries(entries);
}

export async function getAllProducts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      productCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  console.log("entries", entries);
  return extractProductEntries(entries);
}

export async function getAllCourses(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      courseCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${COURSE_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  console.log("entries", entries);
  return extractCourseEntries(entries);
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

export async function getProductAndMoreProducts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      productCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  const entries = await fetchGraphQL(
    `query {
      productCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    product: extractProduct(entry),
    moreProducts: extractProductEntries(entries),
  };
}


export async function getCourseAndMoreCourses(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      courseCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${COURSE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  const entries = await fetchGraphQL(
    `query {
      courseCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${COURSE_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return {
    course: extractCourse(entry),
    moreCourses: extractCourseEntries(entries),
  };
}