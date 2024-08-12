import SubCategory from "@/components/categorization/SubCategory";

export default function Category({ params }) {

  return (
    <SubCategory id={params.category} />
  );
}
