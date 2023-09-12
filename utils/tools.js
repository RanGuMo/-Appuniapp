// 根据经纬度，计算两点的距离
export function getDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // 地球半径，单位千米
  const dLat = (lat2 - lat1) * Math.PI / 180; // 将纬度转换为弧度
  const dLon = (lon2 - lon1) * Math.PI / 180; // 将经度转换为弧度
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}