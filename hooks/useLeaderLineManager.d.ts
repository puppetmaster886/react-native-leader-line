import { View } from 'react-native';

import { LeaderLine, LeaderLineOptions } from '../components/LeaderLineClass';
export declare const useLeaderLineManager: () => {
  createLeaderLine: (
    startElement: React.RefObject<View>,
    endElement: React.RefObject<View>,
    options?: LeaderLineOptions,
  ) => LeaderLine;
  removeLine: (line: LeaderLine) => void;
  measureAllLines: () => Promise<void>;
  renderLines: () => import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>>[];
  forceUpdate: () => void;
  lines: LeaderLine[];
};
export default useLeaderLineManager;
