import Card from '@/components/Card';
import { useTheme } from '@/state/ui/theme';
import React from 'react';

const ConvertToYimbyPage = () => {
  const [, { setTheme }] = useTheme();

  // React.useEffect(() => {
  //   setTheme('dark');
  // }, [setTheme]);

  return (
    <div className="grid h-full grid-cols-5">
      <div className="col-span-3">
        <h1>Convert to Yimby Page</h1>
        <Card>
          <>da</>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <>da</>
        </Card>
        <Card>
          <>da</>
        </Card>
      </div>
    </div>
  );
};
ConvertToYimbyPage.PageHead = () => {
  return <div>Get Priority Access</div>;
};
export default ConvertToYimbyPage;
