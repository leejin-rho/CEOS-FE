import { css } from '@emotion/react';
import { KeyOfPalette } from '../../styles';

export const Logo = ({
  width = 82,
  height = 24,
  color = 'Blue',
  marginLeft = 19.4791,
}: {
  width?: number;
  height?: number;
  color?: KeyOfPalette;
  marginLeft?: number;
}) => {
  return (
    <div
      css={css`
        width: ${width}px;
        height: ${height}px;
        color: ${color};
        margin-left: ${marginLeft}vw;
      `}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 82 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M12.608 23.448C16.704 23.448 20.288 21.432 22.208 18.264L17.792 15.704C16.832 17.432 14.88 18.456 12.608 18.456C8.64 18.456 6.08 15.8 6.08 11.8C6.08 7.8 8.64 5.144 12.608 5.144C14.88 5.144 16.8 6.168 17.792 7.896L22.208 5.336C20.256 2.168 16.672 0.151999 12.608 0.151999C5.856 0.151999 0.96 5.208 0.96 11.8C0.96 18.392 5.856 23.448 12.608 23.448ZM29.7275 18.072V14.104H37.7275V9.24H29.7275V5.528H38.5275V0.599998H24.6075V23H38.6875V18.072H29.7275ZM52.108 23.448C58.54 23.448 63.756 18.392 63.756 11.8C63.756 5.208 58.54 0.151999 52.108 0.151999C45.676 0.151999 40.46 5.208 40.46 11.8C40.46 18.392 45.676 23.448 52.108 23.448ZM52.108 18.456C48.46 18.456 45.58 15.8 45.58 11.8C45.58 7.8 48.46 5.144 52.108 5.144C55.756 5.144 58.636 7.8 58.636 11.8C58.636 15.8 55.756 18.456 52.108 18.456ZM73.6663 23.448C78.5303 23.448 81.9862 20.888 81.9862 16.568C81.9862 11.832 78.1783 10.648 74.7863 9.624C71.2983 8.568 70.7543 7.864 70.7543 6.84C70.7543 5.944 71.5543 5.144 73.1543 5.144C75.2023 5.144 76.2583 6.136 77.0263 7.736L81.3463 5.208C79.7143 1.912 76.8343 0.151999 73.1543 0.151999C69.2823 0.151999 65.6343 2.648 65.6343 6.968C65.6343 11.256 68.8983 12.856 72.2263 13.784C75.5863 14.712 76.8663 15.256 76.8663 16.632C76.8663 17.496 76.2583 18.456 73.8263 18.456C71.2983 18.456 69.9223 17.208 69.1223 15.352L64.7063 17.912C65.9543 21.208 68.9623 23.448 73.6663 23.448Z"
        />
      </svg>
    </div>
  );
};
