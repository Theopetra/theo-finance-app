import Link from 'next/link';

const HorizontalSubNav = ({ items }) => {
  return (
    <div className="flex space-x-2 text-2xl">
      {items.map((x) => (
        <Link key={x.name} href={x.href} passHref={true}>
          <a className="font-semibold text-[#adadad] underline transition-colors duration-200 hover:text-theo-navy dark:hover:text-theo-cyan">
            {x.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalSubNav;
