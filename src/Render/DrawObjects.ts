import type { UIObject } from '../UIObject/UIObject';
import type { Vector2 } from '../types';

export function drawObjects( context: CanvasRenderingContext2D, objects: UIObject[], offset: Vector2, zoom: number ) {
    context.save();
    context.translate( offset.x, offset.y );
    context.scale( zoom, zoom );
    for( const object of objects ) { 
        object.render( context, offset, zoom ); 
    }
    context.restore();
}