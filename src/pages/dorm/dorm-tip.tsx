function DormTip() {
  return (
    <div className="overflow-auto h-full pb-24">
      <h1 className="text-3xl font-bold mb-4">GIST 생활관 사용 팁</h1>
      <p className="text-lg text-neutral-600 mb-4">
        GIST 생활관을 사용하며 유의해야 할 점과 꿀팁들을 정리했습니다.
      </p>
      <h2 className="text-2xl font-bold mb-4">쓰레기 처리</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 mt-4">
        <li>
          생활관 내 개인 방에는 쓰레기통을 두지 않고, 지정된 장소에 배출해야
          합니다.
        </li>
        <li>
          일반쓰레기와 재활용, 음식물 쓰레기를 반드시 구분하여 분리수거해야
          합니다.
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4">인터넷 사용</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 mt-4">
        <li>
          모든 방에는 랜 포트가 있어, 랜선을 통한 유선 인터넷 사용이 가능합니다.
        </li>
        <li>
          Wi-Fi는 사용 가능하나, 별도의 라우터를 직접 설치해야 하며 보안 문제가
          발생할 경우 인터넷 접속이 차단될 수 있으니 주의해 주세요.
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4">배달 음식</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 mt-4">
        <li>
          생활관 내에서 배달음식 주문 및 섭취가 가능합니다. 다만, 취식이
          불가능한 공용 공간(복도, 로비 등)에서는 음식을 섭취할 수 없습니다.
        </li>
        <li>음식물 쓰레기는 반드시 지정된 전용 수거함에 배출해야 합니다.</li>
      </ul>
      <h2 className="text-2xl font-bold mb-4">생활 수칙</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 mt-4">
        <li>
          출입: GIST는 국가 연구개발 기관으로, 출입 시 학생증 등 보안 카드를
          반드시 지참해야 하며 외부인 출입이 제한됩니다.
        </li>
        <li>
          청결: 방과 공용공간을 청결하게 유지해야 하며, 개인 물품은 지정된
          장소에 보관해야 합니다.
        </li>
        <li>
          안전: 전열기, 전기장판 등 화재 위험 물품의 반입이 금지되어 있습니다.
        </li>
        <li>정숙: 22시 이후에는 정숙 시간입니다.</li>
        <li>시설물: 고장 발생 시 즉시 사감실로 신고해야 합니다.</li>
        <li>
          기타: 애완동물 반입이 금지되며, 호실 내 흡연은 엄격히 금지됩니다.
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-4">창고 사용</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 mt-4">
        <li>
          호실 이동, 퇴사 등의 사유로 창고를 이용할 경우 신청 후 사용 가능하며,
          지정된 공간에 보관해야 합니다.
        </li>
        <li>오랫동안 찾아가지 않은 물품은 폐기될 수 있습니다.</li>
      </ul>
    </div>
  )
}

export default DormTip
