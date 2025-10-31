declare module 'meshline' {
    import { BufferGeometry, Material, Vector3 } from 'three'

    export class MeshLineGeometry extends BufferGeometry {
        constructor()
        setPoints(points: Vector3[] | Float32Array): void
    }

    export class MeshLineMaterial extends Material {
        constructor(parameters?: {
            transparent?: boolean
            opacity?: number
            color?: string | number
            depthTest?: boolean
            resolution?: [number, number]
            lineWidth?: number
            [key: string]: any
        })
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >
            meshLineMaterial: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    transparent?: boolean
                    opacity?: number
                    color?: string | number
                    depthTest?: boolean
                    resolution?: [number, number]
                    lineWidth?: number
                },
                HTMLElement
            >
        }
    }
}
