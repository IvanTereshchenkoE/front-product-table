import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from "reselect";
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { currentSellerInfo } from "constants/localStorageKeys";
import { getCurrentSellerStatistic, setSelectedSeller } from 'redux/sellers/actions';

import { currentSellerResolve } from '../utils/sellerRouteHelper';

import {
  CardPaymentAccount,
  CardResolvingFunds,
  CardSettingsCompany,
  CardStatistic,
  CardMarketplaces,
  CardAddProducts,
  CardPriceList,
  CardShipments,
  CardProductPacking,
  CardOrders,
  CardAnalytics,
  CardBookkeeping,
} from '../components/Cards';

const memoizedSelector = createSelector(
  state => state.users.currentUser.data.id,
  state => state.sellers.currentSeller,
  (currentUserId, currentSeller) => ({ currentUserId, currentSeller })
);

function Home() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { currentUserId, currentSeller } = useSelector(memoizedSelector);

  let navigate = useNavigate();

  const { t } = useTranslation();

  React.useEffect(() => {
    let seller = currentSellerResolve(id);
    if (seller && currentSeller.info.id !== parseInt(id)) {
      if (seller.id !== currentSeller.info.id) {
        dispatch(setSelectedSeller(seller));
        localStorage.setItem(currentSellerInfo, JSON.stringify(seller?.info));
      }
      navigate(`/${seller.id}`);
    }
  }, [currentUserId]);

  React.useEffect(() => {
    if(currentSeller && currentSeller.info && currentSeller.info.id) {
      dispatch(getCurrentSellerStatistic(currentSeller.info.id))
    }
  }, [currentSeller])

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <CardSettingsCompany t={t} />

          <CardMarketplaces t={t} />

          <CardAddProducts t={t} />

          <CardPriceList t={t} />

          <CardShipments t={t} />

          <CardProductPacking t={t} />

          <CardOrders t={t} />

          <CardAnalytics t={t} />

          <CardStatistic sellerStatistic={currentSeller.statistic} />

          <CardPaymentAccount t={t} />

          <CardResolvingFunds t={t} />

          <CardBookkeeping t={t} />
        </div>
      </div>
    </main>
  );
}

export default Home;
