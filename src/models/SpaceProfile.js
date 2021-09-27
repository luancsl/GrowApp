import { Model, Q } from '@nozbe/watermelondb'
import { field, children, lazy, action, date, readonly } from '@nozbe/watermelondb/decorators'

export default class SpaceProfile extends Model {
    static table = 'spaces_profile'

    @field('lat')
    lat

    @field('lng')
    lng

    @field('elevation')
    elevation

    @field('service')
    service

    @field('type')
    type

    @field('equation')
    equation

    @field('stationName')
    stationName

    @field('stationCity')
    stationCity

    @field('stationState')
    stationState

    @field('stationCountry')
    stationCountry

    @field('stationDistance')
    stationDistance

    @field('tMax')
    tMax

    @field('tMin')
    tMin

    @field('hum')
    hum

    @field('windS')
    windS

    @field('radQo')
    radQo

    @field('radQg')
    radQg

    @field('eto')
    eto

    @field('name')
    name

    @field('class')
    class

    @field('regionName')
    regionName

    @field('iniStagekc')
    iniStagekc

    @field('midStagekc')
    midStagekc

    @field('endStagekc')
    endStagekc

    @field('iniStageDays')
    iniStageDays

    @field('devStageDays')
    devStageDays

    @field('midStageDays')
    midStageDays

    @field('endStageDays')
    endStageDays

    @field('totalDays')
    totalDays

    @field('kc')
    kc

    @field('phase_select')
    phase_select

    @field('time')
    time

    @field('currentTime')
    currentTime

    @field('play')
    play

    @field('cultureImageLink')
    cultureImageLink

    @date('created_at')
    created_at

    @date('updated_at')
    updated_at

    @date('play_at')
    play_at

    @action async addSpaceProfile(name, kc) {
        return await this.create(SpaceProfile => {
            SpaceProfile.name = name
            SpaceProfile.kc = kc
        })
    }

    @lazy
    kc2 = () => {
        return this.play + this.time
    }


}