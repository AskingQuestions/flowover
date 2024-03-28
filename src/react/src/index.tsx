'use client';

import * as React from 'react';

const { forwardRef, useImperativeHandle, useRef } = React;

function FlowSlotFn<TTag extends React.ElementType = 'div'>(
  props: React.HTMLProps<TTag> & { as?: TTag; name: string },
  ref: React.Ref<HTMLElement>
) {
  const { as: Comp, children, ...restProps } = props;
  const Component = (Comp || 'div') as React.ElementType;

  const myRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => myRef.current as HTMLElement);

  return (
    <Component ref={myRef} {...restProps}>
      FlowOver
      {children}
    </Component>
  );
}

export const FlowSlot = forwardRef(FlowSlotFn);
