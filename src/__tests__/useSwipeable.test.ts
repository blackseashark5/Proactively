import { renderHook } from '@testing-library/react';
import { useSwipeable } from '../components/hooks/useSwipeable';

describe('useSwipeable Hook', () => {
  test('should call onSwipedLeft when swiping left', () => {
    const onSwipedLeft = jest.fn();
    const { result } = renderHook(() => useSwipeable({ onSwipedLeft }));

    // Simulate touch events
    const touchStart = { targetTouches: [{ clientX: 100, clientY: 100 }] };
    const touchEnd = { targetTouches: [{ clientX: 40, clientY: 100 }] };

    result.current.onTouchStart(touchStart as any);
    result.current.onTouchMove(touchEnd as any);
    result.current.onTouchEnd({} as any);

    expect(onSwipedLeft).toHaveBeenCalled();
  });

  test('should call onSwipedRight when swiping right', () => {
    const onSwipedRight = jest.fn();
    const { result } = renderHook(() => useSwipeable({ onSwipedRight }));

    // Simulate touch events
    const touchStart = { targetTouches: [{ clientX: 40, clientY: 100 }] };
    const touchEnd = { targetTouches: [{ clientX: 100, clientY: 100 }] };

    result.current.onTouchStart(touchStart as any);
    result.current.onTouchMove(touchEnd as any);
    result.current.onTouchEnd({} as any);

    expect(onSwipedRight).toHaveBeenCalled();
  });

  test('should not trigger swipe for small movements', () => {
    const onSwipedLeft = jest.fn();
    const { result } = renderHook(() => useSwipeable({ onSwipedLeft }));

    // Simulate small movement
    const touchStart = { targetTouches: [{ clientX: 100, clientY: 100 }] };
    const touchEnd = { targetTouches: [{ clientX: 90, clientY: 100 }] };

    result.current.onTouchStart(touchStart as any);
    result.current.onTouchMove(touchEnd as any);
    result.current.onTouchEnd({} as any);

    expect(onSwipedLeft).not.toHaveBeenCalled();
  });
});