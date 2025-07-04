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

export function selectObjects( objects: UIObject[], selectionBox: BoundingEdges ) {
    return objects.filter( object =>
        isIntersecting( object.getBoundingEdges(), selectionBox )
    );
}