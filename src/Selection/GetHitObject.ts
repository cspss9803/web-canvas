import type { Vector2 } from '../types';
import type { UIObject } from '../UIObject/UIObject';

export function getHitObject( worldPos: Vector2, objects: UIObject[] ): UIObject | null {
    for( const object of [...objects].reverse() ) {
        if( object.isHit( worldPos ) ) {
            return object;
        }
    }
    return null;
}