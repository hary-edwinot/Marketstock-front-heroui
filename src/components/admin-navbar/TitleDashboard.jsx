export default function Title(currentRoute) {
  const { current } = currentRoute;
  return (
    <h2 className="text-[22px] font-bold">{current?.name}</h2>
  );
}
