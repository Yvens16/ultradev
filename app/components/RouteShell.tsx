import React from 'react';
import { Toaster } from 'react-hot-toast';

import GuardedPage from '~/core/firebase/components/GuardedPage';
import FirebaseFirestoreProvider from '~/core/firebase/components/FirebaseFirestoreProvider';
import SidebarContext from '~/lib/contexts/sidebar';

import useCollapsible from '~/core/hooks/use-sidebar-state';
import AppSidebar from '~/components/AppSidebar';

const redirectPathWhenSignedOut = '/';

const RouteShell: React.FCC<{
  sidebarCollapsed: boolean;
}> = (props) => {
  return (
    <FirebaseFirestoreProvider>
      <GuardedPage whenSignedOut={redirectPathWhenSignedOut}>
        <Toaster />

        <RouteShellWithSidebar collapsed={props.sidebarCollapsed}>
          {props.children}
        </RouteShellWithSidebar>
      </GuardedPage>
    </FirebaseFirestoreProvider>
  );
};

export default RouteShell;

function RouteShellWithSidebar(
  props: React.PropsWithChildren<{
    collapsed: boolean;
  }>
) {
  const [collapsed, setCollapsed] = useCollapsible(props.collapsed);

  return (
    <div className={'flex h-full flex-1'}>
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <div className={'hidden lg:block'}>
          <AppSidebar />
        </div>

        <div className={'relative mx-auto h-screen w-full overflow-y-auto'}>
          <div>{props.children}</div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
}
