import { BinaryStar } from "./binary-star.model";

export interface ClusterBinaryStar {
    binarystar: BinaryStar,
    key: number[];
    cluster_idx: number;
    cluster_attributes: any;
}

export interface ClusterBinaryStarTimesteps {
    timesteps: ClusterBinaryStar[][];
    start_ts: number;
}
