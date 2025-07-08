import type { UIObject } from '../UIObject/UIObject';
import type { BoundingEdges } from '../types';

function isIntersecting ( objectEdges: BoundingEdges, selectionEdges: BoundingEdges ): boolean {
    return !(
        objectEdges.maxX < selectionEdges.minX ||
        objectEdges.minX > selectionEdges.maxX ||
        objectEdges.maxY < selectionEdges.minY ||
        objectEdges.minY > selectionEdges.maxY
    );
}

export function selectObjects( objects: UIObject[], selectedSnapshot: Set<UIObject>, selectionEdges: BoundingEdges ) {
    const newlySelected: Set<UIObject> = new Set();
    for (const object of objects) {
        const objectEdges = object.getBoundingEdges(1);
        const isInBox = isIntersecting( objectEdges, selectionEdges );
        const wasSelected = selectedSnapshot.has(object);
        if (isInBox && !wasSelected) { newlySelected.add(object) } // 框選前沒被選取 + 現在被框選到 => 要選取
        else if (!isInBox && wasSelected) { newlySelected.add(object) } // 框選前已被選取 + 現在沒被框選 => 恢復選取
    }
    return newlySelected;
}