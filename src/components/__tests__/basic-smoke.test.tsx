import React, { useRef } from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { LeaderLine } from '../LeaderLine';

describe('LeaderLine Basic Smoke Tests', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(
      <LeaderLine
        start={{ point: { x: 0, y: 0 } }}
        end={{ point: { x: 100, y: 100 } }}
        testID="leader-line"
      />
    );

    expect(getByTestId('leader-line')).toBeTruthy();
  });

  it('should render with element refs', () => {
    const TestComponent = () => {
      const startRef = useRef(null);
      const endRef = useRef(null);

      return (
        <View>
          <View ref={startRef} testID="start-element" />
          <View ref={endRef} testID="end-element" />
          <LeaderLine
            start={{ element: startRef }}
            end={{ element: endRef }}
            testID="leader-line-with-refs"
          />
        </View>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('leader-line-with-refs')).toBeTruthy();
  });

  it('should render with basic styling', () => {
    const { getByTestId } = render(
      <LeaderLine
        start={{ point: { x: 10, y: 10 } }}
        end={{ point: { x: 200, y: 200 } }}
        color="#ff0000"
        strokeWidth={3}
        testID="styled-leader-line"
      />
    );

    const element = getByTestId('styled-leader-line');
    expect(element).toBeTruthy();
  });

  it('should render with different path types', () => {
    const pathTypes = ['straight', 'arc', 'fluid'] as const;
    
    pathTypes.forEach(pathType => {
      const { getByTestId } = render(
        <LeaderLine
          start={{ point: { x: 0, y: 0 } }}
          end={{ point: { x: 100, y: 100 } }}
          path={pathType}
          testID={`leader-line-${pathType}`}
        />
      );

      expect(getByTestId(`leader-line-${pathType}`)).toBeTruthy();
    });
  });

  it('should render with different plug types', () => {
    const plugTypes = ['arrow1', 'arrow2', 'disc', 'square'] as const;
    
    plugTypes.forEach(plugType => {
      const { getByTestId } = render(
        <LeaderLine
          start={{ point: { x: 0, y: 0 } }}
          end={{ point: { x: 100, y: 100 } }}
          endPlug={plugType}
          testID={`leader-line-${plugType}`}
        />
      );

      expect(getByTestId(`leader-line-${plugType}`)).toBeTruthy();
    });
  });
});