/*
 * © 2020 ThoughtWorks, Inc. All rights reserved.
 */

import { AWS_REGIONS } from '@services/aws/AWSRegions'
import { GCP_REGIONS } from '@services/gcp/GCPRegions'

export const CLOUD_CONSTANTS: { [cloudProvider: string]: { [constantName: string]: number } } = {
  GCP: {
    SSDCOEFFICIENT: 1.2,
    HDDCOEFFICIENT: 0.67,
    MIN_WATTS: 0.58,
    MAX_WATTS: 3.54,
    POWER_USAGE_EFFECTIVENESS: 1.11,
    AVG_CPU_UTILIZATION_2020: 50,
  },
  AWS: {
    SSDCOEFFICIENT: 1.2,
    HDDCOEFFICIENT: 0.67,
    MIN_WATTS: 0.59,
    MAX_WATTS: 3.5,
    POWER_USAGE_EFFECTIVENESS: 1.2,
    AVG_CPU_UTILIZATION_2020: 50,
  },
}

export const CLOUD_PROVIDER_WATT_HOURS_CARBON_RATIOS: { [cloudProvider: string]: { [region: string]: number } } = {
  AWS: {
    [AWS_REGIONS.US_EAST_1]: 0.0000003369284124,
    [AWS_REGIONS.US_EAST_2]: 0.0000006031871336,
    [AWS_REGIONS.US_WEST_1]: 0.0000001914159801,
    [AWS_REGIONS.US_WEST_2]: 0.0000001425187227,
    [AWS_REGIONS.AF_SOUTH_1]: 0.0000004322281694,
    [AWS_REGIONS.AP_EAST_1]: 0.000000928,
    [AWS_REGIONS.AP_SOUTH_1]: 0.00000081,
    [AWS_REGIONS.AP_NORTHEAST_3]: 0.000000708,
    [AWS_REGIONS.AP_NORTHEAST_2]: 0.000000506,
    [AWS_REGIONS.AP_SOUTHEAST_1]: 0.0000005,
    [AWS_REGIONS.AP_SOUTHEAST_2]: 0.0000004188,
    [AWS_REGIONS.AP_NORTHEAST_1]: 0.00000079,
    [AWS_REGIONS.CA_CENTRAL_1]: 0.000000506,
    [AWS_REGIONS.CN_NORTH_1]: 0.00000013,
    [AWS_REGIONS.CN_NORTHWEST_1]: 0.000000555,
    [AWS_REGIONS.EU_CENTRAL_1]: 0.000000555,
    [AWS_REGIONS.EU_WEST_1]: 0.00000037862,
    [AWS_REGIONS.EU_WEST_2]: 0.00000034804,
    [AWS_REGIONS.EU_SOUTH_1]: 0.00000023314,
    [AWS_REGIONS.EU_WEST_3]: 0.00000033854,
    [AWS_REGIONS.EU_NORTH_1]: 0.00000003895,
    [AWS_REGIONS.ME_SOUTH_1]: 0.00000001189,
    [AWS_REGIONS.SA_EAST_1]: 0.000000732,
    [AWS_REGIONS.US_GOV_EAST_1]: 0.0000003369284124,
    [AWS_REGIONS.US_GOV_WEST_1]: 0.0000001914159801,
  },
  GCP: {
    [GCP_REGIONS.ASIA_EAST1]: 0.000000554,
    [GCP_REGIONS.ASIA_EAST2]: 0.00000081,
    [GCP_REGIONS.ASIA_NORTHEAST1]: 0.000000506,
    [GCP_REGIONS.ASIA_NORTHEAST2]: 0.000000506,
    [GCP_REGIONS.ASIA_NORTHEAST3]: 0.0000005,
    [GCP_REGIONS.ASIA_SOUTH1]: 0.000000708,
    [GCP_REGIONS.ASIA_SOUTHEAST1]: 0.0000004188,
    [GCP_REGIONS.ASIA_SOUTHEAST2]: 0.000000761,
    [GCP_REGIONS.AUSTRALIA_SOUTHEAST1]: 0.00000079,
    [GCP_REGIONS.EUROPE_NORTH1]: 0.00000013622,
    [GCP_REGIONS.EUROPE_WEST1]: 0.00000015313,
    [GCP_REGIONS.EUROPE_WEST2]: 0.00000023314,
    [GCP_REGIONS.EUROPE_WEST3]: 0.00000037862,
    [GCP_REGIONS.EUROPE_WEST4]: 0.00000045207,
    [GCP_REGIONS.EUROPE_WEST6]: 0.00000001182,
    [GCP_REGIONS.NORTHAMERICA_NORTHEAST1]: 0.00000013,
    [GCP_REGIONS.SOUTHAMERICA_EAST1]: 0.000000074,
    [GCP_REGIONS.US_CENTRAL1]: 0.0000004887004194,
    [GCP_REGIONS.US_EAST1]: 0.000000287849718,
    [GCP_REGIONS.US_EAST4]: 0.0000003369284124,
    [GCP_REGIONS.US_WEST1]: 0.0000001425187227,
    [GCP_REGIONS.US_WEST2]: 0.0000001914159801,
    [GCP_REGIONS.US_WEST3]: 0.0000007300115603,
    [GCP_REGIONS.US_WEST4]: 0.0000003386520634,
    [GCP_REGIONS.UNKNOWN]: 0.0000004016198698, // Average of the above regions
  },
}

export function estimateCo2(estimatedWattHours: number, cloudProvider: string, region: string): number {
  return estimatedWattHours * CLOUD_PROVIDER_WATT_HOURS_CARBON_RATIOS[cloudProvider][region]
}
