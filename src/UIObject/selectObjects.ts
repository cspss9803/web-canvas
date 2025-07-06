import type { UIObject } from './UIObject';
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
    const newlySelected: UIObject[] = [];
    for (const object of objects) {
        const objectEdges = object.getBoundingEdges();
        const isInBox = isIntersecting( objectEdges, selectionEdges );

        const wasSelected = selectedSnapshot.has(object);

        if (isInBox && wasSelected) {
            // 框選前已被選取 + 現在被框選到 => 要取消
            // 不加入 newlySelected
        } else if (isInBox && !wasSelected) {
            // 框選前沒被選取 + 現在被框選到 => 要選取
            newlySelected.push(object);
        } else if (!isInBox && wasSelected) {
            // 框選前已被選取 + 現在沒被框選 => 恢復選取
            newlySelected.push(object);
        }
        // 框選前沒被選取 + 現在沒被框選 => 保持未選
    }
    return newlySelected;
}