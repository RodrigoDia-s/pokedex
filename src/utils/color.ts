import {FastAverageColor} from 'fast-average-color';

export const getColor = async (url: string) => {
    const fac = new FastAverageColor();
    const color = await fac.getColorAsync(url);
    if(color.error) {
        return null;
    }
    return color.hex;
}