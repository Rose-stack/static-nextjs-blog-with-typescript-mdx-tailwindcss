import {
    createContext,
    useContext,
    useState,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
  } from 'react';
  
  type ContextProps = {
    prerequisites: string[];
    setPrerequisites: Dispatch<SetStateAction<string[]>>;
    stacks: string[];
    setStacks: Dispatch<SetStateAction<string[]>>;
  };
  
  type Props = {
    children: ReactNode;
  };
  
  const MdxComponentsContext = createContext({} as ContextProps);
  
  export function MdxComponentsProvider({ children }: Props): ReactElement {
    const [prerequisites, setPrerequisites] = useState<string[]>([]);
    const [stacks, setStacks] = useState<string[]>([]);
  
    return (
      <MdxComponentsContext.Provider
        value={{
          prerequisites,
          setPrerequisites,
          stacks,
          setStacks,
        }}
      >
        {children}
      </MdxComponentsContext.Provider>
    );
  }
  
  export function useMdxComponentsContext(): ContextProps {
    return useContext(MdxComponentsContext);
  }