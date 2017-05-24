import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { StatusMessageService } from "../../../src/app/utils/status-message.service";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { FakeTranslationLoader } from "../_mocks/fake-translation-loader"

describe('StatusMessageService', () => {
    let statusMessageService: StatusMessageService;
    let translateService: TranslateService;
    let translatedTEST: string;

    beforeEach(fakeAsync(()=>{
        TestBed.configureTestingModule({
            providers: [
                {provide: TranslateLoader, useClass: FakeTranslationLoader}
            ],
            imports: [
                TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useClass: FakeTranslationLoader}
                }),
            ]
        });
        translateService = TestBed.get(TranslateService);
        translateService.use("en");
        translateService.get("TEST").subscribe(value => translatedTEST = value);
        tick();
        statusMessageService = new StatusMessageService(translateService);
        tick();
    }));

    it('should accept, translate and return success messages', fakeAsync(() => {
        let receivedMessage: any = { text: "", type: ""};
        statusMessageService.getMessage().subscribe(res => receivedMessage = res);
        statusMessageService.success("TEST");
        tick();
        expect(receivedMessage.text).toEqual(translatedTEST);
        expect(receivedMessage.type).toEqual("success");
    }));

    it('should accept, translate and return error messages', fakeAsync(() => {
        let receivedMessage: any = { text: "", type: ""};
        statusMessageService.getMessage().subscribe(res => receivedMessage = res);
        statusMessageService.error("TEST");
        tick();
        expect(receivedMessage.text).toEqual(translatedTEST);
        expect(receivedMessage.type).toEqual("error");
    }));
});
