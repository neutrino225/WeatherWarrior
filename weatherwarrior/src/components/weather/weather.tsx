import styled from '@emotion/styled';
import { User } from '../../pages/login';
import { JSXElementConstructor } from 'react';

type WeatherProps = {
  temperature: number;
  unit: string;
  location: string;
  feelsLike: number;
  rain: number;
  chance: number;
  humidity: number;
  uv: number;
  wind: number;
  user: User;
  windDirection: number;
};

const getWindDirection = (deg: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

const getGreeting = () => {
  const date = new Date();
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const greeting = getGreeting();

const UserBasedInfo = ({ info }: { info: WeatherProps }): JSX.Element => {
  const user = info.user;
  if (user.category == 'student') {
    return (
      <WeatherDataList>
        <li>
          Feels like: {info.feelsLike}º{info.unit}
        </li>
        <li>Chance of rain: {info.chance}%</li>
        <li>UV Index: {info.uv}</li>
      </WeatherDataList>
    );
  } else if (user.category == 'farmer') {
    return (
      <WeatherDataList>
        <li>Precipitation: {info.rain}mm</li>
        <li>Chance of rain: {info.chance}%</li>
        <li>
          Feels like: {info.feelsLike}º{info.unit}
        </li>
        <li>Humidity: {info.humidity}%</li>
      </WeatherDataList>
    );
  } else if (user.category == 'cyclist') {
    return (
      <WeatherDataList>
        <li>Wind: {info.wind}km/h</li>
        <li>Wind direction: {getWindDirection(info.windDirection)}</li>
        <li>
          Feels like: {info.feelsLike}º{info.unit}
        </li>
        <li>Humidity: {info.humidity}%</li>
        <li>Chance of rain: {info.chance}</li>
      </WeatherDataList>
    );
  } else if (user.category == 'beachgoer') {
    return (
      <WeatherDataList>
        <li>UV Index: {info.uv}</li>
        <li>
          Feels like: {info.feelsLike}º{info.unit}
        </li>
        <li>Humidity: {info.humidity}%</li>
        <li>Chance of rain: {info.chance}%</li>
      </WeatherDataList>
    );
  }

  return (
    <>
      <WeatherDataList>
        <li>
          Feels like: {info.feelsLike}º{info.unit}
        </li>
        <li>Precipitation: {info.rain}mm</li>
        <li>Chance of rain: {info.chance}%</li>
      </WeatherDataList>
      <WeatherDataList>
        <li>Humidity: {info.humidity}%</li>
        <li>UV Index: {info.uv}</li>
        <li>Wind: {info.wind}km/h</li>
      </WeatherDataList>
    </>
  );
};

export const Weather = (props: WeatherProps) => {
  return (
    <WeatherWrapper data-testid="weather-wrapper">
      <UserText>
        {greeting}, {props.user.name}!
      </UserText>
      <Temperature>
        <TemperatureText>
          {props.temperature}
          <small>º{props.unit}</small>
        </TemperatureText>
        <LocationText>{props.location}</LocationText>
      </Temperature>
      {/* <WeatherDataList>
        <li>
          Feels like: {props.feelsLike}º{props.unit}
        </li>
        <li>Precipitation: {props.rain}mm</li>
        <li>Chance of rain: {props.chance}%</li>
      </WeatherDataList>
      <WeatherDataList>
        <li>Humidity: {props.humidity}%</li>
        <li>UV Index: {props.uv}</li>
        <li>Wind: {props.wind}km/h</li>
      </WeatherDataList> */}
      <UserBasedInfo info={props} />
    </WeatherWrapper>
  );
};

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const Temperature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TemperatureText = styled.h1`
  font-size: 8rem;
  font-weight: 100;

  small {
    font-size: 50%;
    vertical-align: super;
  }

  @media screen and (max-width: 768px) {
    font-size: 6rem;
  }
`;

const LocationText = styled.p`
  font-size: 2rem;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const WeatherDataList = styled.ul`
  display: flex;
  font-size: 1.25rem;

  li:not(:last-child)::after {
    content: '•';
    margin: 0 1rem;
    opacity: 0.75;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.25rem 1rem;
    font-size: 1rem;

    li::after {
      display: none;
    }
  }
`;

const UserText = styled.p`
  font-size: 2rem;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
