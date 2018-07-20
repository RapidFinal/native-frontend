package com.jobme.androiod.app;

import android.annotation.SuppressLint;
import android.app.Application;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }



  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    private CallbackManager mCallbackManager;

   @SuppressLint("MissingPermission")
    @Override
    protected List<ReactPackage> getPackages() {
      ReactPackage packages[] = new ReactPackage[]{
              new VectorIconsPackage(),
              new MainReactPackage(),
            new PickerPackage(),
            new RNFetchBlobPackage(),
              new RNFirebasePackage(),
              new RNFirebaseDatabasePackage(),
              new RNFirebaseStoragePackage(),
              new FBSDKPackage(mCallbackManager),
              new RNFirebaseAuthPackage(),
      };
      return Arrays.asList(packages);
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
  AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
