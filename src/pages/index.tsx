import Sidebar from '@/components/sidebar';
import { Meta } from '@/layouts/Meta';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
// eslint-disable-next-line
BigInt.prototype.toJSON = function (): number {
  return Number(this);
};

const Index = () => {
  return (
    <>
      <Meta title={'Sql Player'} description={'Sql Player for the web'} />
      <Sidebar />
    </>
  );
};

export default Index;
