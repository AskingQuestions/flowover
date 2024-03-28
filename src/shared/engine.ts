// Flowover runtime
// provides a loop for updating flowover items

import { bezier } from './bezier-easing';

type ItemContext = {
  transitionDuration: number;
  transitionTimer: number;
  transitionDelay: number;
  transitionTimingFunction: (t: number) => number;

  currentTransform: {
    x: number;
    y: number;

    width: number;
    height: number;
  };

  fromTransform: {
    x: number;
    y: number;

    width: number;
    height: number;
  };

  targetTransform: {
    x: number;
    y: number;

    width: number;
    height: number;
  };

  currentSlot: HTMLElement | null;
  currentSlotName: string | null;
  id: number;
};

type Item = HTMLElement & {
  $flowover?: ItemContext;
};

type SlotContext = {
  id: number;
};

type Slot = HTMLElement & {
  $flowover?: SlotContext;
};

type FlowoverGlobalState = {
  items: Item[];
  isDirty: boolean;
  idCounter: number;
  setDirty: () => void;
  ghosts: HTMLElement[];
  lastFrameTime: number;
};

declare global {
  interface Window {
    $flowover?: FlowoverGlobalState;
  }
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function frameLoop() {
  requestAnimationFrame(frameLoop);

  const flow = getFlowover();

  if (!flow.isDirty) {
    return;
  }

  const now = performance.now();
  const deltaTime = now - flow.lastFrameTime;

  for (const ghost of flow.ghosts) {
    (ghost as HTMLElement & { $flowoverMarked: boolean }).$flowoverMarked =
      false;
  }

  for (const item of flow.items) {
    updateFlowItem(item, deltaTime);
  }

  flow.lastFrameTime = now;

  const dirtySlots = document.querySelectorAll('[data-flowover-slot-dirty]');
  for (let i = 0; i < dirtySlots.length; i++) {
    dirtySlots[i].removeAttribute('data-flowover-slot-dirty');
  }

  for (let i = flow.ghosts.length - 1; i >= 0; i--) {
    const ghost = flow.ghosts[i];
    if (
      !(ghost as HTMLElement & { $flowoverMarked: boolean }).$flowoverMarked
    ) {
      ghost.style.transition = '0ms';
      ghost.style.width = '0';
      ghost.style.height = '0';
      ghost.removeAttribute('data-flowover-ghost');
      ghost.id = '';
      setTimeout(() => {
        ghost.remove();
      }, 0);
      flow.ghosts.splice(i, 1);
    }
  }
}

export function getFlowover(): FlowoverGlobalState {
  if (typeof window !== 'undefined' && !window.$flowover) {
    window.$flowover = {
      items: [],
      isDirty: false,
      idCounter: 8735273,
      lastFrameTime: performance.now(),
      ghosts: [],
      setDirty() {
        window.$flowover!.isDirty = true;
      },
    };

    document.addEventListener('animationiteration', () => {
      window.$flowover?.setDirty();
    });

    document.addEventListener('animationend', () => {
      window.$flowover?.setDirty();
    });

    document.addEventListener('transitionend', () => {
      window.$flowover?.setDirty();
    });

    window.addEventListener('resize', () => {
      window.$flowover?.setDirty();
    });

    // Add our styles
    if (!document.querySelector('[data-flowover-stylesheet]')) {
      const style = document.createElement('style');
      style.dataset.flowoverStylesheet = 'true';
      style.textContent = `
			[data-flowover-item-active] {
				position: fixed !important;
				top: var(--flowover-item-y) !important;
				left: var(--flowover-item-x) !important;
				width: var(--flowover-item-width) !important;
				height: var(--flowover-item-height) !important;
				will-change: transform;
			}
		`;
      document.body.appendChild(style);
    }
    requestAnimationFrame(frameLoop);
  }
  return window.$flowover!;
}

export function registerFlowItem(item: Item) {
  const flow = getFlowover();
  if (!item || item.dataset.flowoverRegistered) {
    return;
  }
  flow.items.push(item);
  item.dataset.flowoverRegistered = 'true';
  flow.setDirty();
}

function initFlowItem(item: Item) {
  const currentRect = item.getBoundingClientRect();

  const id = getFlowover().idCounter++;

  item.$flowover = {
    transitionDuration: 0,
    transitionTimer: 0,
    transitionDelay: 0,
    transitionTimingFunction: bezier(0.26, 1.72, 0.27, 0.39), //(t: number) => t, // Linear by default

    currentTransform: {
      x: currentRect.x,
      y: currentRect.y,
      width: currentRect.width,
      height: currentRect.height,
    },

    fromTransform: {
      x: currentRect.x,
      y: currentRect.y,
      width: currentRect.width,
      height: currentRect.height,
    },
    targetTransform: {
      x: currentRect.x,
      y: currentRect.y,
      width: currentRect.width,
      height: currentRect.height,
    },

    currentSlot: null,
    currentSlotName: null,
    id,
  };

  item.dataset.flowoverItemId = id.toString();
}

function initFlowSlot(slot: Slot) {
  slot.$flowover = {
    id: getFlowover().idCounter++,
  };

  const resizeObserver = new ResizeObserver(() => {
    getFlowover().setDirty();
    slot.dataset.flowoverSlotDirty = 'true';
  });

  resizeObserver.observe(slot);

  slot.addEventListener('animationiteration', () => {
    getFlowover().setDirty();
  });

  slot.addEventListener('animationend', () => {
    getFlowover().setDirty();
  });

  slot.addEventListener('transitionend', () => {
    getFlowover().setDirty();
  });
}

function getSlotContext(slot: Slot): SlotContext {
  const context = slot.$flowover;

  if (!context) {
    initFlowSlot(slot);
  }

  return slot.$flowover!;
}

function getItemContext(item: Item): ItemContext {
  const context = item.$flowover;

  if (!context) {
    initFlowItem(item);
  }

  return item.$flowover!;
}

function getItemNaturalTransform(item: Item) {
  item.removeAttribute('data-flowover-item-active');
  const rect = item.getBoundingClientRect();
  item.setAttribute('data-flowover-item-active', '');

  return rect;
}

function getItemSlotGhost(item: Item, slot: Slot) {
  const itemCtx = getItemContext(item);
  const slotCtx = getSlotContext(slot);

  const slotItemId = `flowover-item-ghost-${itemCtx.id}-${slotCtx.id}`;

  let ghost = document.getElementById(slotItemId);

  if (!ghost) {
    ghost = document.createElement('div');
    ghost.id = slotItemId;
    ghost.dataset.flowoverGhost = `${itemCtx.id}-${slotCtx.id}`;
    (ghost as HTMLElement & { $flowoverMarked: boolean }).$flowoverMarked =
      true;
    slot.appendChild(ghost);
    getFlowover().ghosts.push(ghost);
  }

  return ghost;
}

function getSlotTransform(item: Item, slot: Slot) {
  // Insert a dummy (ghost) item to get the slot's transform with the item
  // the dummy item has an id of <item-id>-<random slot-id>
  // These dummy items are cleaned up automatically when the item-id does not exist
  const ghost = getItemSlotGhost(item, slot);
  const itemCtx = getItemContext(item);

  // Measure the item transform and set the ghost transform to match
  // const itemTransform = getItemNaturalTransform(item);

  const autosize = (item.dataset.flowoverAutosize ?? 'y') as
    | 'x'
    | 'y'
    | 'both'
    | 'none';

  const prevWidth = ghost.style.width;
  const prevHeight = ghost.style.height;

  if (autosize === 'x' || autosize === 'both') {
    ghost.style.width = `${itemCtx.currentTransform.width}px`;
  }
  if (autosize === 'y' || autosize === 'both') {
    ghost.style.height = `${itemCtx.currentTransform.height}px`;
  }

  const rect = ghost.getBoundingClientRect();

  ghost.style.width = prevWidth;
  ghost.style.height = prevHeight;

  return rect;
}

function getFlowItemConfig(item: Item): {
  duration: number;
  delay: number;
} {
  let duration = parseFloat(
    getComputedStyle(item).getPropertyValue('--flowover-duration')
  );
  let delay = parseFloat(
    getComputedStyle(item).getPropertyValue('--flowover-delay')
  );

  if (isNaN(duration)) {
    duration = 2000;
  }

  if (isNaN(delay)) {
    delay = 0;
  }

  return { duration, delay };
}

function resolveSlot(slotName: string, contextEl: HTMLElement): Slot | null {
  // Slots can be placed inside scopes or globally
  // the names can select scopes using .
  // i.e.
  //
  // resolve("slot1", <element inside of scope1>)
  // scope1
  // |__ slot1 <- this is the slot that will be resolved
  // |__ slot2
  //
  // resolve("scope1.slot1", <element inside of scope1>)
  // otherscope
  // |__ slot1
  // |__ scope1
  //    |__ slot1 <- this is the slot that will be resolved
  //    |__ slot2

  const parts = slotName.split('.');

  if (parts.length == 1) {
    let nearestScope = contextEl.closest('[data-flowover-scope]');
    if (!nearestScope) {
      nearestScope = document.body;
    }

    return nearestScope.querySelector(`[data-flowover-slot="${slotName}"]`);
  } else {
    const scope = parts.slice(0, -1).join('.');
    const slot = parts[parts.length - 1];

    const nearestScope = contextEl.closest(`[data-flowover-scope="${scope}"]`);
    if (!nearestScope) {
      return null;
    }

    return nearestScope.querySelector(`[data-flowover-slot="${slot}"]`);
  }
}

function updateFlowItem(item: Item, deltaTime: number) {
  const context = getItemContext(item);

  const config = getFlowItemConfig(item);

  const beginTransition = (to: Slot | null) => {
    if (to === context.currentSlot) {
      return;
    }

    item.dataset.flowoverItemActive = 'true';

    if (to === null) {
      context.currentSlot = null;
      context.currentSlotName = null;
      context.fromTransform = {
        x: context.currentTransform.x,
        y: context.currentTransform.y,
        width: context.currentTransform.width,
        height: context.currentTransform.height,
      };
      context.targetTransform = getItemNaturalTransform(item);
      context.transitionDuration = config.duration;
      context.transitionTimer = 0;
      context.transitionDelay = config.delay;
    } else {
      context.currentSlot = to;
      context.currentSlotName = to.dataset.flowoverSlot ?? null;
      context.fromTransform = {
        x: context.currentTransform.x,
        y: context.currentTransform.y,
        width: context.currentTransform.width,
        height: context.currentTransform.height,
      };
      context.targetTransform = getSlotTransform(item, to);
      context.transitionDuration = config.duration;
      context.transitionTimer = 0;
      context.transitionDelay = config.delay;
    }
  };

  // Update target transform
  const slotName = item.dataset.flowoverItem;
  if (typeof slotName !== 'string' || slotName === '') {
    // Target is the default item transform.
    beginTransition(null);
  } else {
    if (slotName != context.currentSlotName) {
      const targetSlot = resolveSlot(slotName, item);
      if (targetSlot instanceof HTMLElement) {
        beginTransition(targetSlot);
      } else {
        beginTransition(null);
      }
    }
  }

  if (context.currentSlot && context.currentSlot.dataset.flowoverSlotDirty) {
    context.targetTransform = getSlotTransform(item, context.currentSlot);
  }

  // Update current transform

  const slot = context.currentSlot;
  if (slot) {
    if (slot.dataset.flowoverSlotDirty) {
      context.currentTransform = getSlotTransform(item, slot);
    }
  }

  context.transitionTimer += deltaTime;
  const t = Math.max(
    0,
    Math.min(1, context.transitionTimer / context.transitionDuration)
  );
  const easedT = context.transitionTimingFunction(t);

  const natural = getItemNaturalTransform(item);

  const x = lerp(context.fromTransform.x, context.targetTransform.x, easedT);
  const y = lerp(context.fromTransform.y, context.targetTransform.y, easedT);
  const width = lerp(context.fromTransform.width, natural.width, easedT);
  const height = lerp(context.fromTransform.height, natural.height, easedT);
  context.targetTransform.width = natural.width;
  context.targetTransform.height = natural.height;

  context.currentTransform.x = x;
  context.currentTransform.y = y;
  context.currentTransform.width = width;
  context.currentTransform.height = height;

  if (
    !(
      item.style.getPropertyValue('--flowover-item-x') === `${x}px` &&
      item.style.getPropertyValue('--flowover-item-y') === `${y}px` &&
      item.style.getPropertyValue('--flowover-item-width') === `${width}px` &&
      item.style.getPropertyValue('--flowover-item-height') === `${height}px`
    )
  ) {
    item.style.setProperty('--flowover-item-x', `${x}px`);
    item.style.setProperty('--flowover-item-y', `${y}px`);
    item.style.setProperty('--flowover-item-width', `${width}px`);
    item.style.setProperty('--flowover-item-height', `${height}px`);
  }

  if (context.currentSlot) {
    const ghost = getItemSlotGhost(item, context.currentSlot);
    (ghost as HTMLElement & { $flowoverMarked: boolean }).$flowoverMarked =
      true;
    const autosize = (item.dataset.flowoverAutosize ?? 'y') as
      | 'x'
      | 'y'
      | 'both'
      | 'none';

    if (autosize === 'x' || autosize === 'both') {
      const ghostWidth = lerp(0, context.targetTransform.width, easedT);
      ghost.style.width = `${ghostWidth}px`;
    }
    if (autosize === 'y' || autosize === 'both') {
      const ghostHeight = lerp(0, context.targetTransform.height, easedT);
      ghost.style.height = `${ghostHeight}px`;
    }
  }
}
