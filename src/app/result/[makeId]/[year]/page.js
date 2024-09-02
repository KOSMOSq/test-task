import VehicleModels from '@/components/VehicleModels';
import { Suspense } from 'react';

const ResultPage = ({ params }) => {
  const { makeId, year } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Vehicle models</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <VehicleModels makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
};

export async function generateStaticParams() {
  const makesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/GetMakesForVehicleType/car?format=json`
  );
  const makesData = await makesResponse.json();
  const makes = makesData.Results;

  const currentYear = new Date().getFullYear();
  const years = [...Array(currentYear - 2015 + 1)].map((_, i) => 2015 + i);

  const paths = makes.flatMap((make) =>
    years.map((year) => ({
      makeId: make.MakeId.toString(),
      year: year.toString(),
    }))
  );

  return paths;
}

export default ResultPage;
