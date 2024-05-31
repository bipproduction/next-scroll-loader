
# Scroll Loader

**DESCRIPTION:**  
This component is used to load more data on scroll.

## Installation

To install the package, use npm or yarn:

```bash
npm install next-scroll-loader
```

or

```bash
yarn add next-scroll-loader
```

## Usage

### Params

- **height**: `number` - Height of the container.
- **url**: `string` - URL to fetch data.
- **take**: `number` - Number of items to fetch.
- **children**: `(item: any) => React.ReactNode` - Function to render each item.

### Example Client Side

```tsx
import ScrollLoader from 'next-scroll-loader';

<ScrollLoader url="/api/test-scroll" take={30}>
  {(data) => <Box>
    {data.name}
  </Box>}
</ScrollLoader>
```

### Example Server Side

```ts
import { prisma } from './prisma';

export async function GET(req: Request) {
  const take = +(new URL(req.url).searchParams.get('take') || 10);
  const skip = +(new URL(req.url).searchParams.get('skip') || 0);
  
  const data = await prisma.testScroll.findMany({
    take,
    skip,
  });
  return Response.json(data);
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, improvements, or features.

## Acknowledgements

Thanks to all the contributors and users of this package. Your feedback and support are greatly appreciated.

## Contact

For any questions or inquiries, please contact [kurosakiblackangel@gmail.com](mailto:kurosakiblackangel@gmail.com) or WhatsApp at [089697338821](tel:+6289697338821).

## GitHub Repository

For more information, issues, and contributions, visit the [GitHub repository](https://github.com/bipproduction/next-scroll-loader.git).

---

*This README was generated with ❤️ by Makuro.*



This updated README now includes a section with a link to the GitHub repository, providing users with more resources and options for contributing or seeking further information.